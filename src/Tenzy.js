export default function Tenzy(props) {
  const styles = {
    background: props.isSelected ? "#59E391" : "transparent"
  };
  return (
    <div
      style={styles}
      onClick={() => props.toggle(props.id)}
      className="tenzy"
    >
      {props.elem}
    </div>
  );
}
