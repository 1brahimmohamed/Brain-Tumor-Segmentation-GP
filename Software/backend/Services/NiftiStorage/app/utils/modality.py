from enum import Enum


class BDISModalityType(str, Enum):
    """ Enum class for Brain Imaging Data Structure (BDIS) modality types  """

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
