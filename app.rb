require 'sinatra/base'

class App < Sinatra::Base
  set :haml, format: :html5

  get '/' do
    "the time where this server lives is #{Time.now}
      <br /><br />check out your <a href=\"/agent\">user_agent</a>"
  end

  get '/agent' do
    "you're using #{request.user_agent}"
  end

  get '/events' do
    haml 'events/index'.to_sym
  end
end
