# from flask import Blueprint
# from controllers.UserController import index, store, show, update, destroy
#
# user_routes = Blueprint('user_routes', __name__)
# user_routes.route('/', methods=['GET'])(index)
# user_routes.route('/create', methods=['POST'])(store)
# user_routes.route('/<int:user_id>', methods=['GET'])(show)
# user_routes.route('/<int:user_id>/edit', methods=['PUT'])(update)
# user_routes.route('/<int:user_id>', methods=['DELETE'])(destroy)