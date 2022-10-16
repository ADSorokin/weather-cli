import chalk from 'chalk';
import dedent from 'dedent-js';


const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

const unixToTime = (sec) => {
	
	var tdate = new Date(sec * 1000);
	var timestr = tdate.toLocaleTimeString();
	return timestr;
}

const degToCompass = (num) => { 
    while( num < 0 ) num += 360 ;
    while( num >= 360 ) num -= 360 ; 
    let val = Math.round( (num -11.25 ) / 22.5 ) ;
    let arr =["C","ССВ","СВ","ВСВ","В","ВЮВ", "ЮВ", 
          "ЮЮВ","Ю","ССЗ","ЮВ","ЗЮЗ","З","ЗСЗ","СЗ","ССЗ"] ;
    return arr[ Math.abs(val) ] ;
}

const printWeather = (res, icon) => {
	
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Давление: ${Math.round(((res.main.pressure * 760)/1013.25))} mm.рт.ст
		Скорость ветра: ${res.wind.speed}
		Направление ветра: ${degToCompass(res.wind.deg)}
		Восход: ${unixToTime(res.sys.sunrise)}
		Закат:  ${unixToTime(res.sys.sunset)}

		`
	);
};

export { printError, printSuccess, printHelp, printWeather };