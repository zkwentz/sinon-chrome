/**
 * @author https://github.com/acvetkov
 * @overview Firefox's WebExtensions api
 */

import config from '../config/stable-api-ff';
import Api from '../api';

export default new Api(config).create();
