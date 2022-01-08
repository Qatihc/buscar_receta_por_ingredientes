from googletrans import Translator
import csv

translator = Translator()

def ingredients_csv_to_lists():
  ingredients_list = []
  id_list = []
  with open('top-1k-ingredients.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
      ingredient, id = row[0].split(';')
      ingredients_list.append(ingredient)
      id_list.append(id)
  
  return ingredients_list, id_list

def write_list_to_csv(list, filename):
  with open(f'{filename}.csv', 'a', newline='') as csvfile:
      writer = csv.writer(csvfile, delimiter=',')
      for row in list:
        writer.writerow([row])

def translate_list(list, src_lang, dest_lang):
  translated_list = []
  for elem in list:
    translation = translator.translate(elem, src=src_lang, dest=dest_lang)
    translated_list.append(translation.text)
    print(translation.text)

  return translated_list


ingredients_list, id_list = ingredients_csv_to_lists()

""" FATLA EL ELEMENTO 479, 480 en la lista!!!!!!!!!!1 """

""" quinua, platano, patata, salami"""

start_at = 925
step = 5
for cant in range(start_at, 1001 - step, step):
  translated_ingredients_list = translate_list(ingredients_list[cant:cant+step], 'en', 'es')

  translated_csv_rows = [f'{ingredients_list[i+cant]};{translated_ingredients_list[i]};{id_list[i+cant]}' for i in range(0, len(translated_ingredients_list))]
  write_list_to_csv(translated_csv_rows, 'top-1k-ingredients-translated')