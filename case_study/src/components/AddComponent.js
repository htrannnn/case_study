import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllTypes } from "../services/typesService";
import { Link, useNavigate } from "react-router-dom";
import { addNewFacilities } from "../services/facilitiesServices";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

function AddComponent() {
	const [facilities, setFacilities] = useState({
		id: "",
		typeId: "",
		imgSrc: "",
		name: "",
		information: {
			bedroom: "",
			bed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
		view: "",
		describe: "",
		detail: "",
		area: "",
	});

	const [types, setTypes] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setTypes(await getAllTypes());
		};
		fetchData();
	}, []);

	const handleSubmit = async (value) => {
		await addNewFacilities(value);
		toast.success("Added successfully!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Bounce,
		});
		navigate("/rooms");
	};

	const notificationSchema = Yup.object().shape({
		bedroom: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bedroom not valid"),

		bed: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bed not valid"),

		bathroom: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of bathroom not valid"),

		kitchen: Yup.string()
			.required("Empty")
			.min(0, "Greater than or equal to 0")
			.matches(/^\d{1,2}$/, "Number of kitchen not valid"),

		customer: Yup.string()
			.required("Empty")
			.min(1, "Greater than or equal to 1")
			.matches(/^\d{1,2}$/, "Number of customer not valid"),

		price: Yup.string()
			.required("Empty")
			.min(0, "Greater than or equal to 0")
			.matches(/^\d{1,3}(\.\d{3})*$/, "Enter correct currency format. Ex: 6.000.000 VNĐ"),
	});

	const handleValidate = Yup.object({
		name: Yup.string()
			.required("Empty")
			.matches(/^([A-Z]+(?:\s[A-Z]+)*)\s?(\d{1,2})?$/, "Name is not valid"),
		information: notificationSchema,
	});

	return (
		<div style={{ marginTop: "100px" }}>
			<div className="text-center mb-4 ">
				<h2 style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>ADD NEW FACILITIES</h2>
			</div>
			<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={handleValidate}>
				<Form className="mx-5 my-3">
					<Container className="container mt-4">
						<h3 className="ms-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>
							Facilities Information
						</h3>
						<Row>
							<Col>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Type:</label>
									<div className="col-sm-5">
										<Field as="select" name="typeId" className="form-select">
											<option value="">-- Select type --</option>
											{types.map((e) => (
												<option key={e.id} value={e.id}>
													{e.name}
												</option>
											))}
										</Field>
									</div>
								</div>

								<div className="row  mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Name:</label>
									<div className="col-sm-5">
										<Field type="text" name="name" className="form-control" placeholder="Enter facilities name" />
										<ErrorMessage name="name" style={{ color: "red" }} component="div" />
									</div>
								</div>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Bedroom(s):</label>
									<div className="col-sm-5">
										<Field type="number" name="information.bedroom" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bedroom" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Bed(s):</label>
									<div className="col-sm-5">
										<Field type="number" name="information.bed" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bed" style={{ color: "red" }} component="div" />
									</div>
								</div>
							</Col>

							<Col>
								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Bathroom(s):</label>
									<div className="col-sm-5">
										<Field type="number" name="information.bathroom" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.bathroom" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Kitchen(s):</label>
									<div className="col-sm-5">
										<Field type="number" name="information.kitchen" className="form-control" placeholder="Enter number" />
										<ErrorMessage name="information.kitchen" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Guest(s):</label>
									<div className="col-sm-5">
										<Field type="number" name="information.customer" className="form-control" placeholder="Enter max guests" />
										<ErrorMessage name="information.customer" style={{ color: "red" }} component="div" />
									</div>
								</div>

								<div className="row mb-3 ms-1 align-items-center">
									<label className="col-sm-2 me-2 fw-semibold">Price:</label>
									<div className="col-sm-5">
										<Field type="text" name="information.price" className="form-control" placeholder="Enter price" />
										<ErrorMessage name="information.price" style={{ color: "red" }} component="div" />
									</div>
								</div>
							</Col>
						</Row>

						<h3 className="ms-3 mt-3" style={{ fontFamily: "serif", fontWeight: "bold", color: "#cbbe73" }}>
							Facilities Describe
						</h3>
						<Row className="ms-2">
							<label className="col-sm-1 me-2 fw-semibold">Describe:</label>
							<div className="col-sm-9">
								<Field as="textarea" rows="3" name="describe" className="form-control" placeholder="Enter description" />
							</div>
						</Row>
						<Row className="ms-1 mt-3">
							<label className="col-sm-1 me-2 fw-semibold">Detail:</label>
							<div className="col-sm-9">
								<Field as="textarea" rows="3" name="detail" className="form-control" placeholder="Enter detail" />
							</div>
						</Row>
						<Row className="ms-1 mt-3">
							<label className="col-sm-1 me-2 fw-semibold">View:</label>
							<div className="col-sm-9">
								<Field as="textarea" rows="3" name="view" className="form-control" placeholder="Enter view description" />
							</div>
						</Row>

						<Row className="mt-3">
							<div className="ms-3 align-items-center">
								<label className="col-sm-2 mb-2 me-2 fw-semibold">Upload photo:</label>
								<div className="col-sm-4">
									<Field type="file" name="imgSrc" className="form-control" />
								</div>
							</div>
						</Row>
					</Container>
					<ul className="nav nav-pills mt-3">
						<li className="nav-item">
							<Link type="button" className="btn btn me-2" id="buttonBack" to="/rooms">
								Back
							</Link>
						</li>
						<button type="submit" className="btn btn mb-3 ms-2" id="buttonSubmit">
							Submit
						</button>
					</ul>
				</Form>
			</Formik>
		</div>
	);
}

export default AddComponent;
