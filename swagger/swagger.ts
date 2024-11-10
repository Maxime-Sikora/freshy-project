import * as YAML from 'yamljs';
import * as path from 'path';

export function loadSwaggerDocument() {
  const mainDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/main.yaml'),
  );
  const userDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/user.yaml'),
  );
  const authDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/auth.yaml'),
  );
  const categoriesDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/categories.yaml'),
  );
  const companyDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/company.yaml'),
  );
  const productDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/product.yaml'),
  );
  const orderDocument = YAML.load(
    path.join(__dirname, '../..', '/swagger/order.yaml'),
  );

  mainDocument.paths = {
    ...mainDocument.paths,
    ...userDocument.paths,
    ...authDocument.paths,
    ...categoriesDocument.paths,
    ...companyDocument.paths,
    ...productDocument.paths,
    ...orderDocument.paths,
  };

  mainDocument.components.schemas = {
    ...mainDocument.components.schemas,
    ...userDocument.components.schemas,
    ...authDocument.components.schemas,
    ...categoriesDocument.components.schemas,
    ...companyDocument.components.schemas,
    ...productDocument.components.schemas,
    ...orderDocument.components.schemas,
  };

  return mainDocument;
}
