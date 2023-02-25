"use client"
import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import { modal } from "@app/types"
import { useForm } from "react-hook-form"
import { update } from "./requst"

type props = {
	Modal: modal
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
type forms = {
	price: number
	location: string
	description: string
}
const UpdateModal = (props: props) => {
	const { Modal, isOpen, setIsOpen } = props
	useEffect(() => {
		// console.log("delete modal values")
		reset()
		return () => {}
	}, [isOpen])
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<forms>()
	return (
		<Modal
			title="Update Product"
			buttonSettings={{ type: "submit", handleClick: true }}
			onAccept={handleSubmit(async (d) => {
				const res = await update(d)
				setIsOpen((prev) => !prev)
			})}
		>
			<form
				method="post"
				className=" flex flex-col gap-4 p-3"
				onSubmit={handleSubmit((d) => console.log(d))}
			>
				<div className="group">
					<label htmlFor="CustomerName">Price : </label>
					<input type="number" {...register("price", { required: "required" })} />
				</div>
				<p className="text-center text-lg">{errors.price?.message}</p>
				<div className="group">
					<label htmlFor="CustomerName">Location : </label>
					<input type="text" {...register("location")} />
				</div>
				<p className="text-center text-lg">{errors.location?.message}</p>

				<div className="group">
					<label htmlFor="CustomerName">Description:</label>
					<input type="text" {...register("description")} />
				</div>
				<p className="text-center text-lg">{errors.description?.message}</p>
			</form>
		</Modal>
	)
}

export default UpdateModal
