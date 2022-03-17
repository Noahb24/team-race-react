

export const tableHeaders = [
    {
        type: 'select',
        handler: '',
        name: 'racer',
        optionArr: [{name: 'All', value:"all"},],
        label: 'Name'
    }, {
        type: 'number',
        handler: '',
        name: 'lap',
        optionArr: [],
        label: 'Lap'
    }, {
        type: 'number',
        handler: '',
        name: 'team',
        optionArr: [],
        label: 'Team'
    }, {
        type: 'none',
        handler: '',
        name: 'time',
        optionArr: [],
        label: 'Time'
    }, {
        type: 'select',
        handler: '',
        name: 'race',
        optionArr: [{name: 'All', value:"all"},{name: "Backwoods", value:'Backwoods'}, {name:'Sunol', value:'Sunol'}, {name:'Robb Ranch', value:'Robb Ranch'}],
        label: 'Race'
    }, {
        type: 'select',
        handler: '',
        name: 'year',
        optionArr:[{name: 'All', value:"all"}, {name: '2020', value: 2020}, {name: '2021', value: 2021}, {name: '2022', value: 2022}],
        label: 'Year'
    }, {
        type: 'select',
        handler: '',
        name: 'race_type',
        optionArr: [{name: 'All', value:"all"},{name: 'Series', value: 'series'},{name: 'Qualifying', value: 'qualifying'}],
        label: 'Type'
    }
]