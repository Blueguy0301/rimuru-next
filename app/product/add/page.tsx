/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState, useEffect, useRef } from "react"
import Button from "@components/Button"
import useModal from "@components/useModal"
import { formData } from "../../interface"
import { useForm, SubmitHandler } from "react-hook-form"
import ModalScanner from "./components/Modal"
import ProductForm from "./components/ProductForm"
import FormData from "./components/FormData"
import { checkBarcode, sendData } from "./components/request"
export default function page() {
	const { register, handleSubmit, formState, watch, setValue, reset } =
		useForm<formData>()
	const { errors, isSubmitting, isDirty } = formState
	//* idea one : do it in the backend. send a isStoreNew and isNew params inside the json.
	const [isStoreNew, setIsStoreNew] = useState(true)
	const [showSubmit, setShowSubmit] = useState(false)
	const [scanPressed, setScanPressed] = useState(false)
	const [formDisabled, setFormDisabled] = useState([false, false])
	const onSubmit: SubmitHandler<formData> = (data) => {
		//* submit to api here.
		setFormDisabled([true, true])
		sendData(data, isStoreNew, Scanned)
	}
	const formData = watch()
	const [Scanned, setScanned] = useState("none")
	//todo : make this into one whole component where you can use just one modal
	const { Modal, Open, setIsOpen } = useModal()
	useEffect(() => {
		setShowSubmit(true)
	}, [])
	useEffect(() => {
		//* add request here everytime that the scanned value is changed
		const asyncData = async () => {
			const { result } = await checkBarcode(Scanned)
			setIsStoreNew(result.isStoreNew ?? false)
			setFormDisabled([result.isStoreNew ?? false, false])
			setValue("name", result.name)
			setValue("Category", result.Category)
			setValue("mass", result.mass)
		}
		asyncData()
	}, [Scanned])
	return (
		<div className="page box-border flex-wrap">
			<ModalScanner
				Modal={Modal}
				Scanned={Scanned}
				setScanned={setScanned}
				errors={errors}
				scanPressed={scanPressed}
				setScanPressed={setScanPressed}
			/>
			<form
				className="box-border flex  min-w-[50%] flex-grow flex-col gap-3"
				onSubmit={handleSubmit(onSubmit)}
			>
				<ProductForm
					register={register}
					setScanned={setScanned}
					setValue={setValue}
					Scanned={Scanned}
					Open={Open}
					disabled={formDisabled[0]}
					setScanPressed={setScanPressed}
				/>
				<fieldset
					className="min-w-1/2 flex flex-col p-4 disabled:opacity-50"
					disabled={formDisabled[1]}
				>
					<div className="relative flex flex-col gap-4 border border-solid border-white p-4">
						<h3 className="float">Sales information</h3>
						<div className="group">
							<label htmlFor="price">Price</label>
							<input
								type="number"
								id="price"
								min={0}
								{...register("price", { required: "Price is required" })}
							/>
						</div>
						<div className="group">
							<label htmlFor="location">Loaction</label>
							<input
								type="text"
								id="location"
								{...register("location", { required: "Location is required" })}
							/>
						</div>
						<div className="group">
							<label htmlFor="desc">Description</label>
							<input
								type="text"
								id="desc"
								{...register("description", { required: "Description is required" })}
							/>
						</div>
					</div>
				</fieldset>
				{showSubmit && (
					<div className="mt-auto flex flex-wrap items-center justify-center gap-4 p-4">
						<Button
							className="flex-grow disabled:opacity-50"
							type="submit"
							onClick={(e) => {
								if (Object.keys(errors).length === 0) {
									// console.log(Object.keys(errors))
								}
								console.log("pasok")
								setScanPressed(false)
								console.log("pasok 2")
								setIsOpen(true)
							}}
							disabled={!isDirty || isSubmitting}
						>
							Add product
						</Button>
						<Button
							type="reset"
							className="red flex-grow"
							onClick={() => {
								setScanned("none")
								reset()
							}}
							id="puta"
						>
							Reset
						</Button>
					</div>
				)}
			</form>
			<FormData Scanned={Scanned} formData={formData} />
		</div>
	)
}
