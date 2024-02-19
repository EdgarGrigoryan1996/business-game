import Lottie from "react-lottie";

function MyLottie({ data, width, height }) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: data,
  };
  return (
    <Lottie
      options={defaultOptions}
      width={width ? width : ""}
      height={height ? height : ""}
    />
  );
}

export default MyLottie;
