/**
 * @author https://github.com/acvetkov
 * @overview Extensions entry point
 */

import config from '../config/stable-api';
import Api from '../api';

export default new Api(config).create();
