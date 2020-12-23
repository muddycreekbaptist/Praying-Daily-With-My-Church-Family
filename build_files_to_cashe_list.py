import os
PREFIX = "/Praying-Daily-With-My-Church-Family/"
rootDir = '.'

print(f"'{PREFIX}',")
for dirName, subdirList, fileList in os.walk(rootDir, topdown=False):
    if ".git" in dirName:
        continue
    #print('Found directory: %s' % dirName)
    dname = dirName.replace(".\\", "")
    for fname in fileList:
        if dname == ".":
            if ".js" in fname:
                pass
            elif fname in ["LICENSE", "manifest.webmanifest", "README.md", "build_files_to_cashe_list.py"]:
                pass
            else:
                print(f"'{PREFIX}{fname}',")
        else:
            print(f"'{PREFIX}{dname}/{fname}',")