// exports de propriedades gerais de api rest
export * from './api/groups_api';
export * from './api/projects_api';
export * from './api/user_api';
export * from './api/markdown_api';
export * from './api/bulk_imports_api';
export * from './api/namespaces_api';
export * from './api/tags_api';
export * from './api/alert_management_alerts_api';
export * from './api/harbor_registry';
export * from './api/environments_api';

// nota: não é possível espiar os métodos importados desse arquivo para testes jest
//
// em testes jest, importar os métodos do arquivo para cada um que estão definidos:
//
// import * as userapi from '~/api/user_api';
// vs...
// import * as userapi from '~/rest_api';
//
// (isso irá apenas funcionar) com a segunda opção acima
// jest.spyOn(userapi, 'getusers')
