# frozen_string_literal: true

module Table
  class Component < ViewComponent::Base
    attr_reader :resources, :q, :row_action_link, :actions_block

    delegate :sort_link, to: :helpers

    renders_many :columns, ->(attribute, options = {}, &block) do
      ColumnComponent.new(resource: nil, attribute: attribute, options: options, &block)
    end

    def initialize(resources:, q:, row_action_link: nil)
      super
      @resources = resources
      @q = q
      @row_action_link = row_action_link
    end

    def actions(&block)
      @actions_block = block
    end

    def data_link(resource)
      return unless row_action_link.present?

      helpers.send(row_action_link.to_s, resource)
    end

    class ActionsComponent < ViewComponent::Base
      include BootstrapHelper

      attr_accessor :resource
      attr_reader :block

      def initialize(resource:, &block)
        super
        @resource = resource
        @block = block
      end

      def call
        dropdown 'Actions' do
          instance_exec resource, &block
        end
      end
    end

    class ColumnComponent < ViewComponent::Base
      attr_accessor :resource
      attr_reader :attribute, :options, :block

      delegate :status_tag, to: :helpers

      DEFAULT_OPTIONS = {
        sortable: true
      }.freeze

      def initialize(resource:, attribute:, options: {}, &block)
        super
        @resource = resource
        @attribute = attribute
        @block = block
        @options = DEFAULT_OPTIONS.merge(options)
      end

      def call
        value
      end

      private

      def value
        return block.call(@resource) if block.present?

        val = @resource.send(attribute)
        return val&.html_safe if options[:as] == :html
        return status_tag val if val.is_a?(TrueClass) || val.is_a?(FalseClass)
        return render_blob_link(val) if val.respond_to?(:attached?) && val.attached?
        return render_external_link(val) if val.to_s.start_with?('http')

        val
      end

      def render_blob_link(val)
        link_to val.filename, rails_blob_path(val, disposition: 'attachment')
      end

      def render_external_link(val)
        link_to val, val, target: '_blank', rel: 'noopener noreferrer'
      end
    end
  end
end
