task :default => [:serve]

task :serve do
  require 'webrick'
  s = WEBrick::HTTPServer.new(:Port => 9090, :DocumentRoot => Dir.pwd)
  trap('INT') do
    s.shutdown
  end
  s.start
end