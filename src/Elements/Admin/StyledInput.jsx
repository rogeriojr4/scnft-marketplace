import Nullstack from "nullstack";

class StyledInput extends Nullstack {
  render({ bind, placeholder, type, name, id, disabled, label }) {
    return (
      <div class="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <input
          class="border border-white font-md text-white bg-black py-1 px-2"
          bind={bind}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
        />
      </div>
    );
  }
}

export default StyledInput;
