import Nullstack from "nullstack";

class StyledButton extends Nullstack {
  render({ secondary, width, children, onclick, loading, disabled }) {
    return (
      <button
        onclick={onclick}
        disabled={loading || disabled}
        class={`text-black font-bold text-md px-4 py-2 hover:underline ${
          secondary ? "bg-contrast-secondary" : "bg-contrast"
        }`}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
}

export default StyledButton;
