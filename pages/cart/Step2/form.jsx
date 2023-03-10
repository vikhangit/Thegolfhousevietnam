import { React, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { getCartData } from "../../../store/redux/CartReducer/cart.action";
import { getContentData } from "../../../store/redux/LoadContentReducer/content.action";
import { getProvinceData } from "../../../store/redux/ProviceReducer/province.action";

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
function FormLeft({
  register,
  handleSubmit,
  watch,
  errors,
  setValue,
  control,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartData());
    dispatch(getProvinceData());
    dispatch(getContentData());
  }, []);
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
  const optionsCity = province.map((x) => {
    return {
      label: x.name,
      value: x.code,
    };
  });
  const optionsDistrict = district?.map((x) => {
    return {
      label: x.name,
      value: x.code,
    };
  });
  const optionsWards = ward?.map((x) => {
    return {
      label: x.name,
      value: x.code,
    };
  });
  return (
    <form action="">
      <div className="form-group">
        <label htmlFor="" className="form-label">
          H??? t??n
        </label>
        <input type="text" className="form-control" {...register("name")} />
        {errors?.name && (
          <Alert variant="danger">{errors?.name?.message}</Alert>
        )}
      </div>
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
              options={optionsCity}
              // onChange={({ value }) => setCode(Number(value))}
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
              options={optionsDistrict}
              placeholder="Ch???n qu???n/huy???n"
            />
          )}
        />
        {errors?.district && (
          <Alert variant="danger">
            {errors?.district?.message || errors?.district?.label?.message}
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
              options={optionsWards}
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
        {errors?.no && <Alert variant="danger">{errors?.no?.message}</Alert>}
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
      <div className="form-group">
        <label htmlFor="" className="form-label">
          Ghi ch??
        </label>
        <textarea
          type="text"
          rows={8}
          className="form-control"
          placeholder="Ghi ch??"
          {...register("note")}
        />
      </div>
    </form>
  );
}

export default FormLeft;
