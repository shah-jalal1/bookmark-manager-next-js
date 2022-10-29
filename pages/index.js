import dynamic from "next/dynamic";
// used dynamic for avoid error
const  HomePage = dynamic(() => import('../components/HomePage'), { ssr: false })

export default function Home() {
  return (
   <div>
      <HomePage  />
   </div>
  )
}
