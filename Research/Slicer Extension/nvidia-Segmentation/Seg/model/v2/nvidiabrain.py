import json
import os
from glob import glob
from subprocess import call
import time

import nibabel
import numpy as np
from joblib import Parallel, delayed
from skimage.exposure import rescale_intensity

def load_nifty(seq_path):
    print("load_nifty")
    return nibabel.load(seq_path)


def load_channels(d, example_id):
    print("load_channels")
    return [load_nifty(d, example_id, suffix) for suffix in ["flair", "t1", "t1ce", "t2"]]


def get_data(nifty, dtype="int16"):
    print("get_data")
    if dtype == "int16":
        data = np.abs(nifty.get_fdata().astype(np.int16))
        data[data == -32768] = 0
        return data
    return nifty.get_fdata().astype(np.uint8)


def prepare_nifty(d):
    print("prepare_nifty")

    example_id = d.split("/")[-1]

     
    flair, t1, t1ce, t2 = load_channels(d, example_id)
    affine, header = t1.affine, t1.header
    vol = np.stack([get_data(flair), get_data(t1), get_data(t1ce), get_data(t2)], axis=-1)
    vol = nibabel.nifti1.Nifti1Image(vol, affine, header=header)
    nibabel.save(vol, os.path.join(d, example_id + ".nii.gz"))

    if os.path.exists(os.path.join(d, example_id + "_seg.nii.gz")):
        seg = load_nifty(d, example_id, "seg")
        affine, header = seg.affine, seg.header
        vol = get_data(seg, "unit8")
        vol[vol == 4] = 3
        seg = nibabel.nifti1.Nifti1Image(vol, affine, header=header)
        nibabel.save(seg, os.path.join(d, example_id + "_seg.nii.gz"))


def prepare_dirs(data, train):
    print("prepare_dirs")
    img_path, lbl_path = os.path.join(data, "images"), os.path.join(data, "labels")
    call(f"mkdir {img_path}", shell=True)
    if train:
        call(f"mkdir {lbl_path}", shell=True)
    dirs = glob(os.path.join(data, "BraTS*"))
    for d in dirs:
        if "_" in d.split("/")[-1]:
            files = glob(os.path.join(d, "*.nii.gz"))
            for f in files:
                if "flair" in f or "t1" in f or "t1ce" in f or "t2" in f:
                    continue
                if "_seg" in f:
                    call(f"move {f} {lbl_path}", shell=True)
                else:
                    call(f"move {f} {img_path}", shell=True)
        call(f"rmdir /s /q {d}", shell=True)


def prepare_dataset_json(data, train):
    print("prepare_dataset_json")   
    images, labels = glob(os.path.join(data, "images", "*")), glob(os.path.join(data, "labels", "*"))
    images = sorted([img.replace(data + "/", "") for img in images])
    labels = sorted([lbl.replace(data + "/", "") for lbl in labels])

    modality = {"0": "FLAIR", "1": "T1", "2": "T1CE", "3": "T2"}
    labels_dict = {"0": "background", "1": "edema", "2": "non-enhancing tumor", "3": "enhancing tumour"}
    if train:
        key = "training"
        data_pairs = [{"image": img, "label": lbl} for (img, lbl) in zip(images, labels)]
    else:
        key = "test"
        data_pairs = [{"image": img} for img in images]

    dataset = {
        "labels": labels_dict,
        "modality": modality,
        key: data_pairs,
    }

    with open(os.path.join(data, "dataset.json"), "w") as outfile:
        json.dump(dataset, outfile)


# def run_parallel(func, args):
#     print("run_parallel")       
#     return Parallel(n_jobs=os.cpu_count())(delayed(func)(arg) for arg in args)

def run_sequential(func, args):
    print("run_sequential")
    sequences = []
    for arg in args:
        print("arg",arg)
        sequences.append(load_nifty(arg))

    affine, header = sequences[2].affine, sequences[2].header


def prepare_dataset(data, train):
    
    print(f"Preparing BraTS21 dataset from: {data}")
    print("prepare_dataset")   
    start = time.time()
    # run_parallel(prepare_nifty, sorted(glob(os.path.join(data, "BraTS*"))))
    print(sorted(glob(os.path.join(os.path.join(data,'BraTS2021_00300'), "BraTS*"))))
    run_sequential(prepare_nifty, sorted(glob(os.path.join(os.path.join(data,'BraTS2021_00300'), "BraTS*"))))

    prepare_dirs(data, train)
    prepare_dataset_json(data, train)
    end = time.time()
    print(f"Preparing time: {(end - start):.2f}")

