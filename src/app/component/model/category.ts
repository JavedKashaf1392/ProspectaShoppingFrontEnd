export class Category {
  id    : number;
  name  : string;
  alias : string;
  image : string;
  enabled : boolean;
  parent : {};
  childern  : [];
  checked?  : any;
}
