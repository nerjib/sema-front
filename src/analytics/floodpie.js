import React from 'react'
import { Pie } from 'react-chartjs-2';



class FloodPie extends React.Component{
   render(){
    return(
        <div>
<Pie
data={{
                    labels: ['Zone A',' Zone B', 'Zone C'],
                    datasets: [{
                        data:[this.props.zone_a,this.props.zone_b, this.props.zone_c],
                        backgroundColor:['red','blue','purple','green']
                    }]
                }}
                    height='100%'
                />
                
            </div>
    )
    }


}
export default FloodPie