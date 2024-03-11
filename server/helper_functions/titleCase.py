import os

def titlecase_word(word):
    return word[0].upper() + word[1:].lower() if word else ''

def rename_folders(directory):
    # List all items in the specified directory
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        # Check if the current item is a directory
        if os.path.isdir(item_path):
            # Split the folder name into words based on underscores
            words = item.split('_')
            # Capitalize the first letter of each word and lowercase the rest
            new_words = [titlecase_word(word) for word in words]
            # Rejoin the words using underscores
            new_folder_name = '_'.join(new_words)
            new_folder_path = os.path.join(directory, new_folder_name)
            # Rename the folder
            os.rename(item_path, new_folder_path)
            print(f"Renamed '{item}' to '{new_folder_name}'")


directory = '../../client/public/assets/images/'

rename_folders(directory)
