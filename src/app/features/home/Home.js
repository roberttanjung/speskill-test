import dynamic from 'next/dynamic'

const DynamicShop = dynamic(() => import('./spe-frontend-shop/Shop'))
const DynamicTerminal = dynamic(() => import('./awesome-terminal/Terminal'))

const Home = () => {
	return (
		<div>
			<DynamicTerminal />
			<DynamicShop />
		</div>
	)
}

export default Home
