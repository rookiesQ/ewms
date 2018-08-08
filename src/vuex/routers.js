const routers = {
	wechart: {name: 'wechart',url: '/wechart/publicSetting/:id',parent: '', default: '/wechart/publicSetting/:id'},
	publicSetting: {name: 'publicSetting',url: '/wechart/publicSetting/:id',parent: 'wechart', default: '/wechart/publicSetting/:id'},
	autoResponse: {name: 'autoResponse',url: '/wechart/autoResponse/:id',parent: 'wechart', default: '/wechart/autoResponse/:id'},
	QRCodePromote: {name: 'QRCodePromote',url: '/wechart/QRCodePromote/:id',parent: 'wechart', default: '/wechart/QRCodePromote/:id'},
	QRCodeAdd: {name: 'QRCodeAdd',url: '/wechart/QRCodeAdd/:id',parent: 'wechart', default: '/wechart/QRCodeAdd/:id'},
	QRCodeStatistics: {name: 'QRCodeStatistics',url: '/wechart/QRCodeStatistics/:id',parent: 'wechart', default: '/wechart/QRCodeStatistics/:id'}
}
export default routers