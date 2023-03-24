import cnn from "../assets/cnn.png";
import yahoo_entertainment from "../assets/yahoo_entertainment.png";
import bbc_news from "../assets/bbc_news.png";
import usa_today from "../assets/USA_Today.png";
interface Props {
  website: string;
}

const Logo = ({ website }: Props) => {
  const logoMap: { [key: string]: string } = {
    cnn: cnn,
    "bbc news": bbc_news,
    "yahoo entertainment": yahoo_entertainment,
    "usa today": usa_today,
  };
  if (!logoMap[website.toLowerCase()]) return <p>{website}</p>;
  return (
    <img src={logoMap[website.toLowerCase()]} style={{ height: "30px" }} />
  );
};

export default Logo;
