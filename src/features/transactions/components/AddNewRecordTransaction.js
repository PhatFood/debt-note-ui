import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import CurrencyInput from "react-currency-input-field";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import {showNotification} from "../../common/headerSlice";

const INITIAL_LEAD_OBJ = {
    amount: 0, // Currency field
    date: new Date().toISOString().split('T')[0],
};

function AddNewRecordTransaction({closeModal}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

    useEffect(() => {
        console.log(" *---* ", leadObj.date)
    }, [leadObj]);

    const saveNewLead = () => {
        if (leadObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
        else if (leadObj.email.trim() === "") return setErrorMessage("Email is required!");
        else if (leadObj.amount === "" || isNaN(parseFloat(leadObj.amount)))
            return setErrorMessage("Valid amount is required!");
        else {
            let newLeadObj = {
                id: 7,
                email: leadObj.email,
                first_name: leadObj.first_name,
                last_name: leadObj.last_name,
                amount: leadObj.amount,  // Include amount
                avatar: "https://reqres.in/img/faces/1-image.jpg"
            };
            dispatch(showNotification({message: "Transaction added", status: 1}));
            closeModal();
        }
    };

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("");
        setLeadObj({...leadObj, [updateType]: value});
        // console.log(leadObj);
    };

    return (
        <>
            <InputText
                type="text"
                defaultValue={leadObj.first_name}
                updateType="first_name"
                containerStyle="mt-4"
                labelTitle="Contacts"
                updateFormValue={updateFormValue}
            />

            {/* Currency Input Field */}
            <label className="mt-4 block text-sm font-medium text-gray-700">Amount (Currency)</label>
            <CurrencyInput
                className="w-full p-2 border border-gray-300 rounded-md"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                decimalsLimit={2}
                prefix="$"
                value={leadObj.amount}
                onValueChange={(value) => updateFormValue({updateType: "amount", value})}
            />

            <InputText
                type="date"
                defaultValue={leadObj.date}
                updateType="date"
                containerStyle="mt-4"
                labelTitle="Date"
                updateFormValue={updateFormValue}
            />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    );
}

export default AddNewRecordTransaction;