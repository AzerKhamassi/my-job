import React from 'react'
import moment from 'moment'
import { Text } from 'react-native';


const FormateDate = (props) => {
    const nowday = + new Date().toISOString().split('T')[0].split('-')[2];
    const nowyear = + new Date().toISOString().split('T')[0].split('-')[0];
    const nowhour = + new Date().toISOString().split('T')[1].split(':')[0];
    const day = + props.children.split('T')[0].split('-')[2]
    const year = + props.children.split('T')[0].split('-')[0];
    const hour = + props.children.split('T')[1].split(':')[0];

    if (year === nowyear) {
        if (day === nowday)
            if (hour - nowhour > 12 || props.strict)
                if (props.strict)
                    return (
                        <Text>
                            {moment(props.children).format("HH:mm")}

                        </Text>
                    )
                else
                    return (
                        <Text>
                            Today{', '}
                            {moment(props.children).format("HH:mm")}

                        </Text>)
            else
                return (
                    <Text>


                        {moment(props.children).fromNow()}

                    </Text>
                )
        else if (day === nowday - 1)
            return (
                <Text>
                    Yesterday{', '}

                </Text>)

        else
            return (<Text>
                {moment(props.children).format("DD MMMM, HH:mm")}
            </Text>)
    }
    else
        return (
            <Text>

                {moment(props.children).format("DD MMMM YYYY")}

            </Text>
        )
}


export const formatDate = (timestamp) => {
    return <Text>{moment(timestamp).format("h:mm A")}</Text>;
}

export default FormateDate;