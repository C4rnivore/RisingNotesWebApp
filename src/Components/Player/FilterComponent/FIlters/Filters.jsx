import axios from "axios"
import { api } from "../../../App/App"

export const filtersInitial = {
    genre : [],
    genreOrAnd: 'and',

    language : [],
    languageOrAnd: 'and',

    similar : [],
    similarOrAnd: 'and',

    mood : [],
    moodOrAnd: 'and',
    
    duration : 'any',
    
    extra: {
            explicit : "Disabled",
            removed : "Disabled"}
}

const timeFormatters = {
    'any':[0, 3600000],
    'less-than-minute' : [0, 60000],
    'minute-five':  [60001, 300000],
    'more-than-five':[300001, 3600000]
}

// /**
//  * Функция для обновления фильтров
//  * @function
//  * 
//  * @param {any} filterId - тип фильтра: genre | language | similar | mood | duration | extra
//  * @param {any} filterValue - значение фильтра
//  * @param {any} filterOrAnd - значение предиката для фильтра
//  * @return {object} обновленное состояние фильтров
//  */
// export function filtersUpdater(filterId, filterValue, filterOrAnd, filters){
//     let temp = filters
//     switch(filterId){
//         case "genre":
//             temp.genre = filterValue
//             temp.genreOrAnd = filterOrAnd
//             break
//         case "language":
//             temp.language = filterValue
//             temp.languageOrAnd = filterOrAnd
//             break
//         case "similar":
//             temp.similar = filterValue
//             temp.similarOrAnd = filterOrAnd
//             break
//         case "mood":
//             temp.mood = filterValue
//             temp.moodOrAnd = filterOrAnd
//             break
//         case "duration":
//             temp.duration = filterValue
//             break
//         case "extra":
//             temp.extra = filterValue
//             break
//     }
//     return temp
// }

// export function filtersReseter(filters){
//     let temp = filters

//     temp.genre = []
//     temp.genreOrAnd = 'and'
//     temp.language = []
//     temp.languageOrAnd= 'and'
//     temp.similar = []
//     temp.similarOrAnd= 'and'
//     temp.mood = []
//     temp.moodOrAnd = 'and'
//     temp.duration = 'any'
//     temp.extra = {
//             explicit : "Disabled",
//             removed : "Disabled"}

//     return temp
// }

/**
 * Преобразует текущие фильтры в JSON строку
 * @function
 * @param {any} filters - текущие фильтры
 * @return {string} текущие фильтры, преобразованные в JSON строку
 */
export function filtersFormatter(filters){
    const result = {
        'GenreList.ValueList': filters.genre,
        'GenreList.OrPredicate': filters.genreOrAnd == 'and' ? false : true,

        'LanguageList.ValueList': filters.language,
        'LanguageList.OrPredicate': filters.languageOrAnd == 'and' ? false : true,

        'VibeList.ValueList': filters.mood,
        'VibeList.OrPredicate': filters.moodOrAnd == 'and' ? false : true,

        'Gender':0,

        'TrackDurationRange.Start': timeFormatters[filters.duration][0],
        'TrackDurationRange.End':timeFormatters[filters.duration][1],

        'instrumental':null
    }
    return(JSON.stringify(result, null, 1))
}

/**
 * Функция получения списка песен по фильтрам с сервера
 * @function
 * @param {any} filters - текущие фильтры
 * @return список песен по фильтрам
 */
export async function songsByFiltersGetter(filters){

    const query =  `${buildGenreQuery(filters.genre)}
                    GenreList.OrPredicate=${filters.genreOrAnd == 'and' ? false : true}&
                    ${buildLanguageQuery(filters.language)}
                    LanguageList.OrPredicate=${filters.languageOrAnd == 'and' ? false : true}&
                    ${buildVibesQuery(filters.mood)}
                    VibeList.OrPredicate=${filters.moodOrAnd == 'and' ? false : true}&
                    Gender=${1}&
                    TrackDurationRange.Start=${timeFormatters[filters.duration][0]}&
                    TrackDurationRange.End=${timeFormatters[filters.duration][1]}&
                    instrumental=${true}`
    try{
        const response = await axios({
            method:'GET',
            url: api + 'api/song/list?' + query,
            responseType: 'text/plain'
        })
        let result = JSON.parse(response.data)
        return result.songList
    }
    catch(err){
        return -1
    }
}

export function extractSongsIdsList(response){
    let result = []
    try{
        response.forEach(songData => {
            result.push(songData.id) 
        });
    }
    catch(err){
        console.log(err);
    }
    return result
}

function buildGenreQuery(genres){
    let res=''
    genres.forEach(tag => {
        res += `GenreList.ValueList=${tag}&`
    });
    return res
}
function buildLanguageQuery(languages){
    let res=''
    languages.forEach(tag => {
        res += `LanguageList.ValueList=${tag}&`
    });
    return res
}
function buildVibesQuery(vibes){
    let res=''
    vibes.forEach(tag => {
        res += `VibeList.ValueList=${tag}&`
    });
    return res
}