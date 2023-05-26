export const tableHeaders = [
	{
		type: 'select',
		handler: '',
		name: 'racer',
		optionArr: [],
		label: 'Name'
	},
	{
		type: 'number',
		handler: '',
		name: 'lap',
		optionArr: [],
		label: 'Lap'
	},
	{
		type: 'number',
		handler: '',
		name: 'team',
		optionArr: [],
		label: 'Team'
	},
	{
		type: 'none',
		handler: '',
		name: 'time',
		optionArr: [],
		label: 'Time'
	},
	{
		type: 'none',
		handler: '',
		name: 'lap_diff',
		optionArr: [],
		label: '+/-'
	},
	{
		type: 'select',
		handler: '',
		name: 'race',
		optionArr: [],
		label: 'Race'
	},
	{
		type: 'select',
		handler: '',
		name: 'year',
		optionArr:[],
		label: 'Year'
	},
	{
		type: 'select',
		handler: '',
		name: 'race_type',
		optionArr: [{name: 'All', value:"all"},{name: 'Series', value: 'series'},{name: 'Qualifying', value: 'qualifying'}, {name: 'Night', value: 'night'}],
		label: 'Type'
	}
]
