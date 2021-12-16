# frozen_string_literal: true

class AttributesTableComponent < ViewComponent::Base
  attr_reader :resource

  renders_many :rows, ->(attribute, options = {}, &block) do
    RowComponent.new(resource, attribute, options, &block)
  end

  def initialize(resource:)
    super
    @resource = resource
  end

  class RowComponent < ViewComponent::Base
    attr_reader :resource, :attribute, :options, :block

    delegate :status_tag, to: :helpers

    def initialize(resource, attribute, options = {}, &block)
      super
      @resource = resource
      @attribute = attribute
      @block = block
      @options = options
    end

    def call
      content_tag :tr do
        [
          content_tag(:td, label, class: 'fw-bold'),
          content_tag(:td, value)
        ].join.html_safe
      end
    end

    private

    def label
      return attribute if attribute.is_a?(String)

      attribute.to_s.humanize
    end

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
