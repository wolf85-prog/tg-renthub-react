import React from 'react';
import EquipmentItem from "../EquipmentItem/EquipmentItem";

const EquipmentList = ({equipments, remove}) => {
    return (
        <div>
            {equipments.map((equipment) =>
                <EquipmentItem remove={remove} equipment={equipment} key={equipment.id} />
            )}
        </div>
    );
};

export default EquipmentList;