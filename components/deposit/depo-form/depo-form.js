const DepoForm = ({
  changeCategory,
  changeDescription,
  changeValue,
  addDeposit,
  deposit,
}) => {
  return (
    <div>
      <input
        onChange={(e) => {
          changeValue(e.target.value);
          // console.log(deposit.value);
        }}
        placeholder="value"
        type={"number"}
      />
      <input
        onChange={(e) => {
          changeDescription(e.target.value);
          // console.log(deposit.description);
        }}
        type={"text"}
        placeholder="description"
      />
      <input
        onChange={(e) => {
          changeCategory(e.target.value);
          // console.log(deposit.category);
        }}
        type={"text"}
        placeholder="category"
      />
      <input
        onClick={() => {
          addDeposit();
        }}
        className="cursor-pointer"
        type={"button"}
        value="add depo"
      />
    </div>
  );
};

export default DepoForm;
