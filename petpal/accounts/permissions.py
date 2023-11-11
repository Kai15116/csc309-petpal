from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class IsCurrentUser(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.id == view.kwargs.get('pk')
    
class IsPetSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return hasattr(user, 'petseeker')


class IsPetSeekerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        method = request.method
        return method in SAFE_METHODS or hasattr(user, 'petseeker')


class IsPetShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return hasattr(user, 'petshelter')


class IsPetShelterOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        method = request.method
        return method in SAFE_METHODS or hasattr(user, 'petshelter')
