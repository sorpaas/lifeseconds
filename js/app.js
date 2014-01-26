var country_codes;
var current_year_countries;
var current_year;

function init_years(element) {
	$.getJSON("data/years.json", function(data) {
		for(var i = 0; i < data.length; i++) {
			var year_option = document.createElement("option");
			year_option.setAttribute("value", data[i]);
			year_option.innerHTML = data[i]
			element.appendChild(year_option);
		}
	});
}

function init_countries(element) {
	for(var key in country_codes) {
		var country_option = document.createElement("option");
		country_option.setAttribute("value", key);
		country_option.innerHTML = country_codes[key];
		element.appendChild(country_option);
	}
}

function init_country_codes(callback) {
	$.getJSON("data/countries.json", function(data) {
		country_codes = data;
		callback();
	})
}

function select_year(year) {
	var years_element = document.getElementById("years");
	var current_countries_element = document.getElementById("current_countries");
	var compare_countries_element = document.getElementById("compare_countries");
	
	current_countries_element.disabled = "disabled";
	compare_countries_element.disabled = "disabled";
	
	current_year = year;
	$.getJSON("data/" + year + ".json", function(data) {
		current_year_countries = data;
		update_result();
		current_countries_element.disabled = "";
		compare_countries_element.disabled = "";
	});
}

function update_result() {
	var result_element = document.getElementById("result");
	
	var error = function() {
		result_element.innerHTML = "Sorry, we cannot compare that. ";
	}
	
	var blank = function() {
		result_element.innerHTML = "";
	}
	
	var current_countries_element = document.getElementById("current_countries");
	var compare_countries_element = document.getElementById("compare_countries");
	
	var current_key = current_countries_element.options[current_countries_element.selectedIndex].value;
	var compare_key = compare_countries_element.options[compare_countries_element.selectedIndex].value;
	
	if((!current_key) || (!compare_key)) {
		blank();
		return;
	}
	
	var current_span = parseFloat(current_year_countries[current_key]);
	var compare_span = parseFloat(current_year_countries[compare_key]);
	
	var current_country_name = country_codes[current_key];
	var compare_country_name = country_codes[compare_key];
	
	var result_second = current_span / compare_span;
	
	if(!(result_second == result_second) || result_second == 0) {
		error();
		return;
	}

	result_element.innerHTML = "In " + current_year + ", One second in " + compare_country_name + " is " + result_second + " second(s) in " + current_country_name + ". ";
}

(function() {
	var years_element = document.getElementById("years");
	var current_countries_element = document.getElementById("current_countries");
	var compare_countries_element = document.getElementById("compare_countries");
	
	years_element.disabled = "disabled";
	current_countries_element.disabled = "disabled";
	compare_countries_element.disabled = "disabled";
	
	init_years(years_element);
	init_country_codes(function() {
		init_countries(current_countries_element);
		init_countries(compare_countries_element);
		
		years_element.disabled = '';
		current_countries_element.disabled = '';
		compare_countries_element.disabled = '';
	});
	
	years_element.onchange = function(e){
		select_year(years_element.options[years_element.selectedIndex].value);
	};
	
	current_countries_element.onchange = function(e) {
		update_result();
	};
	
	compare_countries_element.onchange = function(e) {
		update_result();
	};
})();