import Nullstack from "nullstack";

class FaucetIcon extends Nullstack {
  render({color}) {
    return (
      <svg
        width="42"
        height="31"
        viewBox="0 0 42 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.3937 15.4875H25.2793C24.0121 14.4034 22.419 13.6266 20.65 13.2289V9.39252L18.0688 9.11988L15.4875 9.39252V13.2289C13.7185 13.6322 12.1254 14.4066 10.8582 15.4875H1.29062C0.94833 15.4875 0.620054 15.6235 0.378015 15.8655C0.135976 16.1076 0 16.4358 0 16.7781L0 24.5219C0 24.8642 0.135976 25.1924 0.378015 25.4345C0.620054 25.6765 0.94833 25.8125 1.29062 25.8125H8.77544C10.4363 28.856 13.9549 30.975 18.0688 30.975C22.1826 30.975 25.7012 28.856 27.3621 25.8125H28.3937C29.0783 25.8125 29.7349 26.0845 30.219 26.5685C30.703 27.0526 30.975 27.7092 30.975 28.3937C30.975 29.0783 31.247 29.7349 31.731 30.219C32.2151 30.703 32.8717 30.975 33.5562 30.975H38.7188C39.4033 30.975 40.0599 30.703 40.544 30.219C41.028 29.7349 41.3 29.0783 41.3 28.3937C41.3 24.9708 39.9402 21.688 37.5198 19.2677C35.0995 16.8473 31.8167 15.4875 28.3937 15.4875ZM6.58138 7.73649L18.0688 6.52653L29.5561 7.73649C30.316 7.81715 30.975 7.18717 30.975 6.38133V3.94367C30.975 3.13703 30.316 2.50785 29.5561 2.5877L20.65 3.52825V1.29062C20.65 0.94833 20.514 0.620055 20.272 0.378016C20.0299 0.135976 19.7017 0 19.3594 0H16.7781C16.4358 0 16.1076 0.135976 15.8655 0.378016C15.6235 0.620055 15.4875 0.94833 15.4875 1.29062V3.52825L6.58138 2.5877C5.82153 2.50785 5.1625 3.13783 5.1625 3.94367V6.38133C5.1625 7.18717 5.82153 7.81715 6.58138 7.73649Z"
          fill={color || "#FFC701"}
        />
      </svg>
    );
  }
}

export default FaucetIcon;