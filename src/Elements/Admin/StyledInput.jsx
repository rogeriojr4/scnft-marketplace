import Nullstack from "nullstack";

class StyledInput extends Nullstack {
  render({ source, placeholder, type, name, id, disabled, label }) {
    return (
      <div class="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <input
          class="border border-white font-md text-white bg-black py-1 px-2"
          bind={source[name]}
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
