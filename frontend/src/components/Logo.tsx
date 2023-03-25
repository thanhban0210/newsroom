import cnn from "../assets/cnn.png";
import yahoo_entertainment from "../assets/yahoo_entertainment.png";
import bbc_news from "../assets/bbc_news.png";
import usa_today from "../assets/USA_Today.png";
import independent from "../assets/independent.png";

interface Props {
  website: string;
  size: number;
}

const Logo = ({ website, size }: Props) => {
  const logoMap: { [key: string]: string } = {
    cnn: cnn,
    "bbc news": bbc_news,
    "yahoo entertainment": yahoo_entertainment,
    "usa today": usa_today,
    independent: independent,
  };
  if (!logoMap[website.toLowerCase()]) return <p>{website}</p>;
  return (
    <img src={logoMap[website.toLowerCase()]} style={{ height: `${size}px` }} />
  );
};

export default Logo;
