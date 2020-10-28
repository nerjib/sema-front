import React from 'react'
import { Pie } from 'react-chartjs-2';



class ZoneCPie extends React.Component{
   render(){
    return(
        <div >
<Pie
data={{
                    labels: ['Jemaa','Jaba',' Kaura','Kagarko', 'Kauru','Sanga','Zangon Kataf','Kachia'],
                    datasets: [{
                        data:[this.props.zone_a,this.props.zone_b, this.props.zone_c],
                        backgroundColor:['red','blue','purple','green']
                    }]
                }}
                    height='200%'
                />
                
            </div>
    )
    }


}
export default ZoneCPie
/*
const HFire =({zone_a, zone_b,zone_c})=> {
    return(
        <div>
            <Pie
data={{
                    labels: ['Zone A','Zone B','Zone C'],
                    datasets: [{
                        data:[zone_a,zone_b,zone_c],
                        backgroundColor:['red','blue','green']
                    }]
                }}
                    height='100%'
                />
        </div>
    )
}

export {
    HFire
};*/