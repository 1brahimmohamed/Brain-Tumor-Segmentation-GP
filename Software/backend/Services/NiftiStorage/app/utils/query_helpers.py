import os


def get_files_in_project(project, upload_dir):
    """
    Get all files in a project directory
    :param project: the project name
    :param upload_dir:  the upload directory
    :return:  a dictionary of files in the project directory
    """

    # subs is a list of all the subjects in the project
    # sequences is a list of all the sequences in the subject

    project_files = {}
    subs = os.listdir(upload_dir / project)
    for sub in subs:
        project_files[sub] = {}
        sequences = os.listdir(upload_dir / project / sub)
        for sequence in sequences:
            project_files[sub][sequence] = os.listdir(upload_dir / project / sub / sequence)

    return project_files
