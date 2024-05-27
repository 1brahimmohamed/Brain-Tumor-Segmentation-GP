import os


def get_files_in_project(project, upload_dir):
    project_files = {}
    subs = os.listdir(upload_dir / project)
    for sub in subs:
        project_files[sub] = {}
        sequences = os.listdir(upload_dir / project / sub)
        for sequence in sequences:
            project_files[sub][sequence] = os.listdir(upload_dir / project / sub / sequence)

    return project_files
