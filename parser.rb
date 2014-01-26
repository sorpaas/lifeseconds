require 'rubygems'
require 'csv'
require 'json'

COUNTRY_CODE_INDEX = 1
COUNTRY_NAME_INDEX = 0
YEAR_START_INDEX = 4

rows = CSV.read('original.csv', encoding: "BOM|UTF-16LE:UTF-8")
titles = rows.shift
country_value_by_years = {}
country_codes = {}

YEAR_START_INDEX.times do
  titles.shift
end

titles.each do |year|
  country_value_by_years[year] = {}
end

years = titles
rows.each do |row|
  country_code = row[COUNTRY_CODE_INDEX]
  country_codes[country_code] = row[COUNTRY_NAME_INDEX]
  YEAR_START_INDEX.times do
    row.shift
  end
  
  year_index = 0
  row.each do |value|
    country_value_by_years[years[year_index]][country_code] = value
    year_index = year_index + 1
  end
end

File.open('data/countries.json', 'w') do |file|
  file.write(JSON.generate(country_codes))
end

country_value_by_years.each do |key, country_year|
  File.open("data/#{key}.json", 'w') do |file|
    file.write(JSON.generate(country_year))
  end
end