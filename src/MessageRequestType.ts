enum MessageAuthRequestType {
	_PREFIX = 'auth',
	LOGIN = 'auth:login',
	REGISTER = 'auth:register',
	LOGOUT = 'auth:logout',
}

enum MessageChannelRequestType {
	_PREFIX = 'channel',
	CREATE = 'channel:create',
	JOIN = 'channel:join',
	LEAVE = 'channel:leave',
	LIST = 'channel:list',
	MESSAGE = 'channel:message',
}
