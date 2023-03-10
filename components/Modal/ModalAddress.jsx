import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { Loader, Modal, Toggle } from "rsuite";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import { getProvinceData } from "../../store/redux/ProviceReducer/province.action";
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 16,
    fontWeight: 400,
    color: state.isSelected ? "#fff" : "#000",
    backgroundColor: state.isSelected ? "#576e33" : "#fff",
    "&:hover": {
      backgroundColor: "#bbbbbb",
      color: "#fff",
    },
    cursor: "pointer",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#A6A6A6",
    fontSize: 16,
    fontWeight: 500,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  container: (provided, state) => ({
    ...provided,
    width: "100%",
    border: "1px solid #979797",
    borderRadius: 4,
  }),
  input: (base, state) => ({
    ...base,
    color: "#000",
    fontSize: 16,
    fontWeight: 500,
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "tranparent",
    paddingLeft: 20,
    paddingRight: 20,
    "@media screen and (max-width: 992px)": {
      paddingLeft: 12,
      paddingRight: 12,
    },
    paddingTop: 6,
    paddingBottom: 6,
    cursor: "pointer",
    color: "#000",
    border: "1px solid #979797",
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
  placeholder: (base) => {
    return {
      ...base,
      fontSize: 16,
      fontWeight: 500,
    };
  },
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <i
        className="fa-solid fa-caret-down"
        style={{
          fontSize: 20,
          color: "#A6A6A6",
        }}
      ></i>
    </components.DropdownIndicator>
  );
};
const PHONE_REGEX = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Vui l??ng ??i???n s??? ??i???n tho???i")
    .min(10, "S??? ??i???n tho???i ph???i nhi???u h??n 9 k?? t???")
    .max(12, "S?? ??i???n tho???i ph???i ??t h??n 12 k?? t???")
    .matches(PHONE_REGEX, "S??? ??i???n tho???i kh??ng h???p l???"),
  email: yup
    .string()
    .email("Email kh??ng h???p l???")
    .required("Vui l??ng ??i???n email"),
  city: yup
    .object()
    .shape({
      label: yup.string().required("Vui l??ng ch???n t???nh/th??nh ph???"),
      value: yup.string().required("Vui l??ng ch???n t???nh/th??nh ph???"),
    })
    .nullable()
    .required("Vui l??ng ch???n t???nh/th??nh ph???"),
  district: yup
    .object()
    .shape({
      label: yup.string().required("Vui l??ng ch???n qu???n/huy???n"),
      value: yup.string().required("Vui l??ng ch???n qu???n/huy???n"),
    })
    .nullable()
    .required("Vui l??ng ch???n qu???n/huy???n"),
  ward: yup
    .object()
    .shape({
      label: yup.string().required("Vui l??ng ch???n ph?????ng/x??"),
      value: yup.string().required("Vui l??ng ch???n ph?????ng/x??"),
    })
    .nullable()
    .required("Vui l??ng ch???n ph?????ng/x??"),
  street: yup.string().required("Vui l??ng ??i???n t??n ???????ng"),
  no: yup.string().required("Vui l??ng ??i???n s??? nh??"),
});

function ModalAddress({
  handleClose,
  setDefaultAddress,
  defaultAddress,
  checkoutMethod,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const province = useSelector((state) => state.ProvinceReducer.province);
  const district = watch("city")
    ? province[
        province.findIndex((x) => x.code === Number(watch("city")?.value))
      ]?.districts
    : [];
  const ward =
    watch("city") && watch("district")
      ? district[
          district.findIndex((x) => x.code === Number(watch("district")?.value))
        ]?.wards
      : [];
  useEffect(() => {
    dispatch(getProvinceData());
  }, []);
  useEffect(() => {
    reset({
      city: "",
      district: "",
      ward: "",
      street: "",
      no: "",
      phone: "",
      email: "",
    });
    setDefaultAddress(false);
  }, []);
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(data);
    }, 2000);
  };
  return (
    <Modal
      open={true}
      onClose={handleClose}
      id="modal-signup"
      data-aos="fade-down"
      data-aos-delay="800"
    >
      <Modal.Header>
        <Modal.Title>?????a ch??? giao h??ng</Modal.Title>
        <button onClick={handleClose}>
          <i className="fa-light fa-times"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <h5>Vui l??ng nh???p ?????a ch??? ????? LIO giao h??ng ?????n b???n</h5>
        {province && district && ward ? (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                T???nh/Th??nh ph???
              </label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    options={province.map((x) => {
                      return {
                        value: x.code,
                        label: x.name,
                      };
                    })}
                    placeholder="Ch???n t???nh/th??nh ph???"
                  />
                )}
              />
              {errors?.city && (
                <Alert variant="danger">
                  {errors?.city?.message || errors?.city?.label?.message}
                </Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Qu???n/Huy???n
              </label>
              <Controller
                control={control}
                name="district"
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    options={district?.map((x) => {
                      return {
                        value: x.code,
                        label: x.name,
                      };
                    })}
                    placeholder="Ch???n qu???n/huy???n"
                  />
                )}
              />
              {errors?.district && (
                <Alert variant="danger">
                  {errors?.district?.message ||
                    errors?.district?.label?.message}
                </Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Ph?????ng/X??
              </label>
              <Controller
                control={control}
                name="ward"
                render={({ field }) => (
                  <Select
                    {...field}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    options={ward?.map((x) => {
                      return {
                        value: x.code,
                        label: x.name,
                      };
                    })}
                    placeholder="Ch???n ph?????ng/x??"
                  />
                )}
              />
              {errors?.ward && (
                <Alert variant="danger">
                  {errors?.ward?.message || errors?.ward?.label?.message}
                </Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                T??n ???????ng
              </label>
              <input
                type="text"
                className="form-control"
                {...register("street")}
                placeholder="T??n ???????ng"
              />
              {errors?.street && (
                <Alert variant="danger">{errors?.street?.message}</Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                S??? nh??
              </label>
              <input
                type="text"
                className="form-control"
                {...register("no")}
                placeholder="S??? nh??"
              />
              {errors?.no && (
                <Alert variant="danger">{errors?.no?.message}</Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                ??i???n Tho???i
              </label>
              <input
                type="text"
                className="form-control"
                {...register("phone")}
                placeholder="??i???n tho???i"
              />
              {errors?.phone && (
                <Alert variant="danger">{errors?.phone?.message}</Alert>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                {...register("email")}
                placeholder="Email"
              />
              {errors?.email && (
                <Alert variant="danger">{errors?.email?.message}</Alert>
              )}
            </div>
            <div className="form-group form-check form-switch">
              <label
                className="form-label form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                ?????t l??m m???c ?????nh
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={defaultAddress}
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={(e) => setDefaultAddress(e.target.checked)}
              />
            </div>
            <div className="button">
              <button>X??c nh???n</button>
            </div>
          </form>
        ) : (
          <Loader content="Vui l??ng ch??? v??i gi??y..." />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddress;
