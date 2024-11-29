# test/test_helper.rb

require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/test/' # Exclude test files from coverage
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

