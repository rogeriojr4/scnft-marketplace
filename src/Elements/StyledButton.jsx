import Nullstack from "nullstack";

class StyledButton extends Nullstack {
  render({ secondary, width, children }) {
    return (
      <button
        class={`text-black font-bold text-md px-4 py-2 ${
          secondary ? "bg-contrast-secondary" : "bg-contrast"
        }`}
      >
        {children}
      </button>
    );
  }
}

export default StyledButton;
