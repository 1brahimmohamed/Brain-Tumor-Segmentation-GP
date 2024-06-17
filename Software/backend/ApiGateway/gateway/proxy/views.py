from revproxy.views import ProxyView


class OrthancProxyView(ProxyView):
    upstream = 'http://orthanc:8042'


