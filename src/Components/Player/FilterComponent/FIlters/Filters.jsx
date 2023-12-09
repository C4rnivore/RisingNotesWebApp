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
    'any':[0, 1000],
    'less-than-minute' : [0, 1],
    'minute-five':  [1, 5],
    'more-than-five':[5, 1000]
}

/**
 * Функция для обновления фильтров
 * @function
 * 
 * @param {any} filterId - тип фильтра: genre | language | similar | mood | duration | extra
 * @param {any} filterValue - значение фильтра
 * @param {any} filterOrAnd - значение предиката для фильтра
 * @return {object} обновленное состояние фильтров
 */
export function filtersUpdater(filterId, filterValue, filterOrAnd, filters){
    let temp = filters
    switch(filterId){
        case "genre":
            temp.genre = filterValue
            temp.genreOrAnd = filterOrAnd
            break
        case "language":
            temp.language = filterValue
            temp.languageOrAnd = filterOrAnd
            break
        case "similar":
            temp.similar = filterValue
            temp.similarOrAnd = filterOrAnd
            break
        case "mood":
            temp.mood = filterValue
            temp.moodOrAnd = filterOrAnd
            break
        case "duration":
            temp.duration = filterValue
            break
        case "extra":
            temp.extra = filterValue
            break
    }
    return temp
}

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
