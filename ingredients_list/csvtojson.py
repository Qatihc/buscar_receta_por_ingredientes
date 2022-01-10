import csv
import json

translated_ingredients = {}
ingredients = {}
with open('top-1k-ingredients-translated.csv', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=',')
  for row in reader:
    print(row)
    [ingredient, translated_ingredient, id] = row[0].split(';')
    """     translated_ingredients[translated_ingredient.lower().capitalize()] = {'id': id, 'englishName': translated_ingredient} """
    ingredients[ingredient.lower().capitalize()] = {'id': id}


with open('ingredients.json', 'w') as outfile:
  json.dump(ingredients, outfile)

""" with open('translated_ingredients.json', 'w') as outfile:
  json.dump(translated_ingredients, outfile) """