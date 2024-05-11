from enum import Enum


class BDISModalityType(str, Enum):
    anat = 'anat'
    func = 'func'
    dwi = 'dwi'
    fmap = 'fmap'
    pref = 'pref'
    eeg = 'eeg'
    meg = 'meg'
    ieeeg = 'ieeg'
    pet = 'pet'
    nirs = 'nirs'
    motion = 'motion'
