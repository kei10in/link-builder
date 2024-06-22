declare module "*.svg?react" {
  const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
