import '@/app/globals.css'
import dynamic from 'next/dynamic'

const DynamicHome = dynamic(() => import('@/app/features/home/Home'))

const HomePage = () => {
  return (
    <DynamicHome />
  )
}

export default HomePage
